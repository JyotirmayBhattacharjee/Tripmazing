package com.tourism.booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.tourism.booking.Model.Booking;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmation(Booking booking) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(booking.getEmail());
        message.setSubject("Booking Confirmation - FirstFlight Travels");

        message.setText(
                "Dear " + booking.getName() + ",\n\n" +

                        "🎉 Booking Confirmation – Tripmazing 🎉\n\n" +

                        "We are delighted to inform you that your travel booking has been " +
                        "successfully confirmed. Below are the details of your journey:\n\n" +

                        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                        "📍 Destination     : " + booking.getCountry() + " - " + booking.getLocation() + "\n" +
                        "📦 Package         : " + booking.getPackageName() + "\n" +
                        "👨‍👩‍👧 Travellers      : " + booking.getAdults() + " Adult(s), " +
                        booking.getChildren() + " Child(ren)\n" +
                        "🛫 Departure Date  : " + booking.getDepartureDate() + "\n" +
                        "📌 Departure City  : " + booking.getDepartureLocation() + "\n" +
                        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +

                        "Our team is already working to make your trip comfortable, memorable, " +
                        "and hassle-free. If you have any special requests or need assistance, " +
                        "feel free to reply to this email.\n\n" +

                        "✨ \"Travel is the only thing you buy that makes you richer.\" ✨\n\n" +

                        "Thank you for choosing Tripmazing.\n" +
                        "We look forward to being a part of your journey!\n\n" +

                        "Warm regards,\n" +
                        "Tripmazing Team 🌍✈️");

        mailSender.send(message);
    }
}
