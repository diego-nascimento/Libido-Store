import nodemailer from 'nodemailer';
//@ts-ignore
import sgTransport from 'nodemailer-sendgrid-transport';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const options = {
  auth: {
    api_key: process.env.SG_APIKEY,
  },
};

const transporter = nodemailer.createTransport(sgTransport(options));

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      layoutsDir: path.resolve(process.cwd(), 'views', 'layouts'),
      defaultLayout: 'main',
      partialsDir: path.resolve(process.cwd(), 'views', 'partials'),
    },
    viewPath: path.resolve(process.cwd(), 'views', 'partials'),
    extName: '.handlebars',
  }),
);

export default transporter