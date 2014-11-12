// (C) 1998-2015 Information Desire Software GmbH
// www.infodesire.com

package com.infodesire.infomarket;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.PropertyConfigurator;


/**
 * Filter to add the authentication key to a proxied request from browser to REST.
 *
 */
public class ApplicationKeyFilter implements Filter {

  @Override
  public void destroy() {
    // TODO Auto-generated method stub
    
  }

  @Override
  public void doFilter( ServletRequest request, ServletResponse response,
    FilterChain chain ) throws IOException, ServletException {

    if( request instanceof HttpServletRequest ) {
      
      RequestWithAddedHeaders newRequest = new RequestWithAddedHeaders(
        (HttpServletRequest) request );
      newRequest.addHeader( "x-application-key", "dummy" );
      request = newRequest;

    }
    
    chain.doFilter( request, response );
    
  }

  @Override
  public void init( FilterConfig arg0 ) throws ServletException {
    
    Properties properties = new Properties();
    properties.put( "log4j.logger.org.apache", "WARN" );
    properties.put( "log4j.logger.org.restlet", "WARN" );
    PropertyConfigurator.configure( properties );
    
  }

}
