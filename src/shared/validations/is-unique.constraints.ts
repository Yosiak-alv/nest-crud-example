import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { EntityManager } from 'typeorm';
import { IsUniqueConstraintInput } from './is-unique';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {}
    async validate(
        value: any, 
        args?: ValidationArguments
    ): Promise<boolean> {
        
        const {tableName, column}: IsUniqueConstraintInput = args.constraints[0];

        const result = await this.entityManager
        .getRepository(tableName)
        .createQueryBuilder()
        .where({ [column]: value })
        .getExists();

        return !result;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const field: string = validationArguments.property
        return `${field} is already exist`
    }
}