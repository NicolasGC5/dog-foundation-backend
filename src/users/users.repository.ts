import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async get(
    page: number = 1,
    limit: number = 20,
    orderBy: 'name',
    order: 'asc' | 'desc' = 'asc',
    status?: 'activo' | 'inactivo',
  ): Promise<{ data: Partial<User>[]; total: number }> {
    const validOrderFields = ['name', 'email', 'phone', 'createdAt'];
    const safeOrderBy = validOrderFields.includes(orderBy) ? orderBy : 'name';

    const where: any = {};
    if (status === 'activo') where.status = true;
    else if (status === 'inactivo') where.status = false;

    // ✅ Corrección clave aquí:
    page = Math.max(1, page);

    const [users, total] = await this.usersRepository.findAndCount({
      where,
      order: { [safeOrderBy]: order.toUpperCase() as 'ASC' | 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const sanitizedUsers = users.map(({ password, ...user }) => user);

    return { data: sanitizedUsers, total };
  }

  async getById(id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { password, isAdmin, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;

    return user;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = await this.usersRepository.save(user);
    const { password, isAdmin, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  }

  async update(id: string, user: UpdateUserDto): Promise<Partial<User>> {
    await this.usersRepository.update(id, user);

    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    const { password, isAdmin, ...userWithoutPassword } = updateUser;

    return userWithoutPassword;
  }

  async delete(id: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.usersRepository.remove(user);
    return user.id;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    return user;
  }
}
