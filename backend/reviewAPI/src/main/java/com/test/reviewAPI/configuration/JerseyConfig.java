package com.test.reviewAPI.configuration;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;
import com.test.reviewAPI.controller.admin.LoginController;
import com.test.reviewAPI.controller.admin.MemberManagementController;
import com.test.reviewAPI.interceptor.CorInterceptor;
import com.test.reviewAPI.interceptor.UserInterceptor;

@Component
public class JerseyConfig extends ResourceConfig {
  /**
   * Register the interceptors as a Jersey resource.
   */
  private void registerInterceptors() {
    register(UserInterceptor.class);
    register(CorInterceptor.class);
  }
  
  /**
   * Register all endpoints for the service.
   */
  private void registerEndpoints() {
    register(MemberManagementController.class);
    register(LoginController.class);
  }

  public JerseyConfig() {
    registerInterceptors();
    registerEndpoints();
  }
}
