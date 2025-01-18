import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      // Determina el código de estado HTTP
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      // Extrae el mensaje del error
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception.message || 'Unexpected error';
  
      // Log detallado en la consola
      this.logger.error(
        `Error: ${JSON.stringify({
          statusCode: status,
          path: request.url,
          method: request.method,
          message: exception.message || 'Internal server error',
          stack: exception.stack,
        })}`,
      );
  
      // Devuelve una respuesta amigable al cliente
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: typeof message === 'string' ? message : (message as any).message || message,
      });
    }
  }
  