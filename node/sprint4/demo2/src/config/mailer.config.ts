import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7066e45a0e1033',
    pass: '970c27477056c1',
  },
});

export default transport;
