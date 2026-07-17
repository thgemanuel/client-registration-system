import { GeneralExceptionFilter } from '@infrastructure/filters/general-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

describe('GeneralExceptionFilter', () => {
  let filter: GeneralExceptionFilter;
  let logger: jest.Mocked<Logger>;

  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockResponse = { status: mockStatus };
  const mockRequest = { url: '/clients', method: 'GET' };

  const mockHost = {
    switchToHttp: () => ({
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    }),
  } as unknown as ArgumentsHost;

  beforeEach(() => {
    jest.clearAllMocks();
    logger = { warn: jest.fn(), error: jest.fn(), log: jest.fn() } as any;
    filter = new GeneralExceptionFilter(logger);
  });

  it('should respond with the HttpException status and body for HttpExceptions', () => {
    const exception = new HttpException('Not Found', HttpStatus.NOT_FOUND);

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledWith('Not Found');
  });

  it('should respond with 500 for unexpected generic errors', () => {
    const exception = new Error('Something went wrong');

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
        path: '/clients',
      }),
    );
  });

  it('should call logger.warn for HttpExceptions', () => {
    const exception = new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    filter.catch(exception, mockHost);

    expect(logger.warn).toHaveBeenCalled();
  });

  it('should call logger.error for unexpected generic errors', () => {
    const exception = new Error('Database connection failed');

    filter.catch(exception, mockHost);

    expect(logger.error).toHaveBeenCalled();
  });

  it('should include a timestamp field in the 500 error response', () => {
    const exception = new Error('Unexpected');

    filter.catch(exception, mockHost);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ timestamp: expect.any(String) }),
    );
  });

  it('should correctly handle HttpException with object body', () => {
    const body = { message: 'Validation failed', error: 'Bad Request', statusCode: 400 };
    const exception = new HttpException(body, HttpStatus.BAD_REQUEST);

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledWith(body);
  });
});
