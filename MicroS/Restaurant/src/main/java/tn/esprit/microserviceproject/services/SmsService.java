package tn.esprit.microserviceproject.services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class SmsService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String twilioPhoneNumber;

    public void sendSms(String toPhoneNumber, String message) {
        Twilio.init(accountSid, authToken); // Initialize Twilio

        // Trim and ensure E.164 format
        toPhoneNumber = toPhoneNumber.trim().replaceAll("\\s+", "");

        // Ensure the number starts with '+'
        if (!toPhoneNumber.startsWith("+")) {
            toPhoneNumber = "+" + toPhoneNumber;
        }

        // Log values for debugging
        System.out.println("📌 Account SID: " + accountSid);
        System.out.println("📌 Auth Token: " + authToken);
        System.out.println("📌 To: " + toPhoneNumber);
        System.out.println("📌 From: " + twilioPhoneNumber);
        System.out.println("📌 Message: " + message);

        // Validate E.164 format (only digits after "+")
        if (!toPhoneNumber.matches("^\\+?[1-9]\\d{6,14}$")) {
            System.err.println("❌ Invalid phone number format: " + toPhoneNumber);
            return;
        }

        try {
            Message.creator(
                    new PhoneNumber(toPhoneNumber),   // To number
                    new PhoneNumber(twilioPhoneNumber), // From Twilio number
                    message // Message content
            ).create();

            System.out.println("✅ SMS sent successfully to " + toPhoneNumber);
        } catch (Exception e) {
            System.err.println("❌ Failed to send SMS: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
