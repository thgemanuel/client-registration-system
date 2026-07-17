import { DomainExceptionFilter } from '@infrastructure/filters/domain-exception.filter';
import { DomainException } from '@domain/exceptions/domain.exception';
import { ClientAlreadyExistsException } from '@domain/exceptions/client-already-exists.exception';
import { ClientEmailAlreadyExistsException } from '@domain/exceptions/client-email-already-exists.exception';
import { ArgumentsHost, Logger } from '@nestjs/common';

describe('DomainExceptionFilter', () => {
  let filter: DomainExceptionFilter;
  let logger: jest.Mocked<Logger>;

  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockResponse = { status: mockStatus };
  const mockRequest = { url: '/clients', method: 'POST' };

  const mockHost = {
    switchToHttp: () => ({
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    }),
  } as unknown as ArgumentsHost;

  beforeEach(() => {
    jest.clearAllMocks();
    logger = { warn: jest.fn(), error: jest.fn(), log: jest.fn() } as any;
    filter = new DomainExceptionFilter(logger);
  });

  it('should respond with status 400 and the errors array for a DomainException', () => {
    const exception = new DomainException(['Field X is invalid']);

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({ reason: 'Field X is invalid' }),
        ]),
      }),
    );
  });

  it('should respond with 400 and the correct error code for ClientAlreadyExistsException', () => {
    const exception = new ClientAlreadyExistsException();

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({
            code: 'ClientAlreadyExistsException',
            reason: 'Este CPF já está cadastrado',
          }),
        ]),
      }),
    );
  });

  it('should respond with 400 and the correct error code for ClientEmailAlreadyExistsException', () => {
    const exception = new ClientEmailAlreadyExistsException();

    filter.catch(exception, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({
            code: 'ClientEmailAlreadyExistsException',
            reason: 'Este E-mail já está cadastrado',
          }),
        ]),
      }),
    );
  });

  it('should call logger.warn when a domain exception is caught', () => {
    const exception = new ClientAlreadyExistsException();

    filter.catch(exception, mockHost);

    expect(logger.warn).toHaveBeenCalled();
  });

  it('should include a title field in the response', () => {
    const exception = new DomainException(['Some validation error']);

    filter.catch(exception, mockHost);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ title: expect.any(String) }),
    );
  });
});
