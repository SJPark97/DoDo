package com.ssafy.dodo.config;

import com.ssafy.dodo.auth.CustomOAuth2User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class JpaAuditConfig implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (null == authentication || !authentication.isAuthenticated()) {
            return null;
        }

        Long seq;
        if(authentication.getPrincipal() instanceof CustomOAuth2User){
            seq = ((CustomOAuth2User)authentication.getPrincipal()).getSeq();
        }else{
            seq = Long.parseLong(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
        }
        return Optional.of(seq);
    }
}
