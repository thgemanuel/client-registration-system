export class BadRequestDTO {
  title: string;
  errors: {
    code: string;
    title: string;
    reason: string;
  }[];
}
