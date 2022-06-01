import transport from '../config/mailer.config';
import { ErrorHandler } from '../errors';

class mailerService {
  welcomeEmail = (userEmail: string) => {
    const mailOptions = {
      from: 'pedro@kenzie.com.br',
      to: userEmail,
      subject: 'Bem-vindo!',
      text: 'Seja bem-vindo a api demo q4!',
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        throw new ErrorHandler(424, 'Email could not be sent.');
      }
    });
  };
}

export default new mailerService();
