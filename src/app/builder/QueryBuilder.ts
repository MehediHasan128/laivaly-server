import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // Create search method
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Create filter method
  filter() {
    const queryObj = { ...this.query };

    // Filter
    const excludesFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludesFields.forEach((ele) => delete queryObj[ele]);

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  // Create sort method
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.queryModel = this.queryModel.sort(sort as string);

    return this;
  }

  // Create pagination method
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }

  async countTotal() {
    const totalQuries = this.queryModel.getFilter();
    const total = await this.queryModel.model.countDocuments(totalQuries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
};

export default QueryBuilder;
