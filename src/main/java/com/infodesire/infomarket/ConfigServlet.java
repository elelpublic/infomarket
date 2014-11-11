// (C) 1998-2015 Information Desire Software GmbH
// www.infodesire.com

package com.infodesire.infomarket;

import com.google.common.base.Throwables;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URISyntaxException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;


/**
 * Manage configuration of the wabapp
 *
 */
public class ConfigServlet extends HttpServlet {


  private static final long serialVersionUID = -7949041376159361010L;
  
  
  private static Logger logger = Logger.getLogger( ConfigServlet.class );
  
  
  protected void doGet( HttpServletRequest httpRequest,
    HttpServletResponse response ) throws ServletException, IOException {
    
    try {
      
      PreparedRequest request = new PreparedRequest( httpRequest );
      
      response.setContentType( "text/html;charset=utf-8" );
      response.setStatus( HttpServletResponse.SC_OK );
      
      PrintWriter writer = response.getWriter();
      
      head( writer );
      
      writer.println( "<h1>Debug the HTTP request</h1>" );
      writer.println( "<div>" );
      
      request.toHTML( writer );
      
      writer.println( "</div>" );
      foot( writer );
      writer.close();

    }
    catch( URISyntaxException ex ) {
      errorPage( ex, httpRequest, response );
    }
    catch( IOException ex ) {
      errorPage( ex, httpRequest, response );
    }
    catch( Exception ex ) {
      errorPage( ex, httpRequest, response );
    }

  }


  private void head( PrintWriter writer ) {
    writer.println( "<html><head>" );
    writer.println( "<link rel=\"icon\" type=\"image/ico\" href=\"/favicon.ico\"/>" );
    writer.println( "</head><body>" );
  }


  private void foot( PrintWriter writer ) {
    writer.println( "</body></html>" );
  }

  
  private void errorPage( Exception ex, HttpServletRequest request,
    HttpServletResponse response ) {

    try {

      response.setContentType( "text/html;charset=utf-8" );
      response.setStatus( HttpServletResponse.SC_INTERNAL_SERVER_ERROR );

      PrintWriter writer = response.getWriter();
      
      writer.println( "<h1>Internal Server Error</h1>" );
      writer.println( "<div>" );
      writer.println( "<pre>" );
      writer.println( Throwables.getStackTraceAsString( ex ) );
      writer.println( "</pre>" );
      writer.println( "</div>" );

      writer.close();

    }
    catch( Exception ex1 ) {
      logger.fatal( "Error writing the error page", ex1 );
    }

  }


}


