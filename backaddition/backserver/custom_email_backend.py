
import certifi
from django.core.mail.backends.smtp import EmailBackend
from smtplib import SMTP_SSL, SMTP
from ssl import create_default_context

class CustomEmailBackend(EmailBackend):
    def open(self):
        if self.connection:
            return False
        connection_class = SMTP_SSL if self.use_ssl else SMTP
        self.connection = connection_class(self.host, self.port, timeout=self.timeout)
        self.connection.set_debuglevel(self._debuglevel)
        if self.username and self.password:
            self.connection.ehlo()
            if self.use_tls:
                context = create_default_context(cafile=certifi.where())
                self.connection.starttls(context=context)
                self.connection.ehlo()
            self.connection.login(self.username, self.password)
        return True
