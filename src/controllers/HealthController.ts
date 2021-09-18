import { Get, Route, Tags } from 'tsoa';

interface IHealthResponse {
  health: boolean;
}

@Route('health')
@Tags('health')
export default class HealthController {
  @Get('/')
  public async health(): Promise<IHealthResponse> {
    return { health: true };
  }
}
