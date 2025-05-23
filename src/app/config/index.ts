import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    admin_pass: process.env.ADMIN_PASS,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    jwt_access_secret_token: process.env.JWT_ACCESS_SECRET_TOKEN,
    jwt_refresh_secret_token: process.env.JWT_REFRESH_SECRET_TOKEN,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
    reset_pass_ui_link: process.env.RESET_PASSWORD_UI_LINK,
    smtp_secret_credential: process.env.SMTP_SECRET_CREDENTIAL,
    stripe_secret_key: process.env.STRIPE_SECRETR_KEY,
    stripe_webhook_key: process.env.STRIPE_WEBHOOKS_KEY
}