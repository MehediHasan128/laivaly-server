import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(searchableField: string[]) {
    if (this?.query?.searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableField.map(
          (field) =>
            ({
              [field]: { $regex: this.query.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this
  }

  filter(){
    const queryObj = {...this.query};
    const excludeFields = ['searchTerm', 'sort', 'limit'];
    excludeFields.forEach((ele) => delete queryObj[ele]);

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort(){
    const sort = this?.query?.sort || '-createdAt';

    this.queryModel = this.queryModel.sort(sort as string);

    return this;
  }

  paginate(){
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit);
    const skip = (page-1)*limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
