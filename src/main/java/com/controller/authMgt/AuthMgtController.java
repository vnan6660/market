package com.controller.authMgt;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthMgtController {
	
	@RequestMapping("/authMgt")
	public String authMgt() {
		return "authMgt";
	}
}
