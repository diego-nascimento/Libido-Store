import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { partials } from 'handlebars';

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

export default async function handler(Request, Response) {
  const data = Request.body.data;
  var email = {
    from: 'libidopirauba@gmail.com',
    to: 'libidopirauba@gmail.com',
    subject: 'Novo Pedido',
    template: 'email',
    context: data,
  };
  const response = await transporter.sendMail(email);
  return Response.status(200).json(response);
}
