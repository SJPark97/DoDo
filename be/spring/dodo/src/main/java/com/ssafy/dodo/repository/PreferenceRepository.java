package com.ssafy.dodo.repository;

import com.ssafy.dodo.entity.Preference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {
}
