import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestPasswordDto } from './dto/request-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RecoverService } from './recover.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('recover')
export class RecoverController {
  constructor(private readonly recoverService: RecoverService) {}

  @ApiOperation({ summary: 'Request a password reset' })
  @Post('request-password')
  requestPassword(@Body() dto: RequestPasswordDto) {
    return this.recoverService.requestPasswordReset(dto.email);
  }

  @ApiOperation({ summary: 'Reset your password' })
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.recoverService.resetPassword(dto.token, dto.newPassword);
  }
}
