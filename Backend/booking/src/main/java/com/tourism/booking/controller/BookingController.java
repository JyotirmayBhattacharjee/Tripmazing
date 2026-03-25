package com.tourism.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tourism.booking.Model.Booking;
import com.tourism.booking.Model.repository.BookingRepository;
import com.tourism.booking.service.EmailService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    // ✅ SAVE BOOKING + SEND EMAIL
    @PostMapping
    public Booking saveBooking(@RequestBody Booking booking) {
        // 1. Save to Database
        Booking savedBooking = bookingRepository.save(booking);

        // 2. Try to send email, but don't crash if it fails
        try {
            emailService.sendBookingConfirmation(savedBooking);
        } catch (Exception e) {
            System.err.println("Email failed: " + e.getMessage());
            // The request continues even if we hit this catch block
        }

        return savedBooking;
    }

    // ✅ GET ALL BOOKINGS (Admin use)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
