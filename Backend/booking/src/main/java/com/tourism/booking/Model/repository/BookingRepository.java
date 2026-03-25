package com.tourism.booking.Model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tourism.booking.Model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
}
