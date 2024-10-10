import { Injectable, Inject } from '@nestjs/common';
import { appConfig } from 'src/core/configs';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { readHtml } from 'src/shared';
import { EmailOptions } from './interface';

/**
 * Service for sending HTML emails.
 */
@Injectable()
export class MailerService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}
  private EM_HOST = this.configService.mail.host;
  private EM_PORT = this.configService.mail.port;
  private EM_USER = this.configService.mail.user;
  private EM_PASSWORD = this.configService.mail.password;
  private EM_SENDER_NAME = this.configService.mail.senderName;
  private EM_SENDER_EMAIL = this.configService.mail.senderEmail;

  /**
   * Sends an HTML email.
   *
   * @param receiverEmail - The recipient's email address.
   * @param subject - The email subject.
   * @param html - The HTML content of the email.
   */
  async sendHtmlMail(receiverEmail: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
      host: this.EM_HOST,
      port: this.EM_PORT,
      secure: true,
      logger: true,
      debug: true,
      ignoreTLS: true,
      auth: {
        user: this.EM_USER,
        pass: this.EM_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${this.EM_SENDER_NAME}" <${this.EM_SENDER_EMAIL}>`,
      to: receiverEmail,
      subject: subject,
      html: html,
    });
  }

  /**
   * Sends an HTML email with optional text replacements.
   *
   * @param options - The email options, including HTML content and text replacements.
   * @throws {HttpException} If replacement arrays are not correctly set.
   */
  async sendMail(options: EmailOptions) {
    let modifiedHtml = await readHtml(options.htmlContent);

    const inputHTML =
      '<p>Welcome to [FRONTEND_URL]. Your PIN code is [PIN_CODE].</p>';
    const toBeReplacedTextArray = ['[PIN_CODE]', '[FRONTEND_URL]'];
    const replacementTextArray = ['123', 'http://example.com'];

    await this.replaceTextArray(
      inputHTML,
      toBeReplacedTextArray,
      replacementTextArray,
    );

    if (options.toBeReplacedTextArray && options.replacementTextArray) {
      modifiedHtml = await this.replaceTextArray(
        modifiedHtml,
        options.toBeReplacedTextArray,
        options.replacementTextArray,
      );
    }

    await this.sendHtmlMail(
      options.receiverEmail,
      options.subject,
      modifiedHtml,
    );
  }

  private async replaceTextArray(
    text: string,
    toBeReplacedTextArray: string[],
    replacementTextArray: string[],
  ) {
    let updatedText = text;

    for (let i = 0; i < toBeReplacedTextArray.length; i++) {
      const escapedText = toBeReplacedTextArray[i].replace(
        /[-\/\\^$*+?.()|[\]{}]/g,
        '\\$&',
      );
      const regex = new RegExp(escapedText, 'g');
      updatedText = updatedText.replace(regex, replacementTextArray[i]);
    }

    return updatedText;
  }
}
