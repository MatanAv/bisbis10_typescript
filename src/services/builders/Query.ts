import { snakeCase } from 'lodash';
import { Operators } from '../../enums/queries';
import { QueryFilters } from '../../interfaces/queries';

class QueryBuilder {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  private sanitizeValue(value: any): string {
    return Array.isArray(value) ? value.map((v) => `'${v}'`).join(', ') : `'${value}'`;
  }

  private buildFilterExpression(field: string, operator: Operators, value: any): string {
    switch (operator) {
      case Operators.IS_NULL:
      case Operators.IS_NOT_NULL:
        return `${field} ${operator}`;
      case Operators.ANY:
        return `${field} = ANY(${this.sanitizeValue(value)})`;
      case Operators.CONTAINS:
        return `${field} ${operator} ARRAY[${this.sanitizeValue(value)}]::VARCHAR[]`; // For now only VARCHAR[] is supported
      default:
        return `${field} ${operator} ${this.sanitizeValue(value)}`;
    }
  }

  private buildFilters(filters: QueryFilters = {}): string {
    const fields = Object.keys(filters);

    if (!fields.length) {
      return '';
    }

    const filterExpressions = fields.map((key) => {
      const { operator = Operators.EQUAL, value } = filters[key];
      const snakeCasedKey = snakeCase(key);

      return this.buildFilterExpression(snakeCasedKey, operator, value);
    });

    return ' WHERE ' + filterExpressions.join(' AND ');
  }

  getFindQuery(filters?: QueryFilters) {
    return `SELECT * FROM ${this.table}${this.buildFilters(filters)}`;
  }

  getFindByIdQuery(id: number | string) {
    return `SELECT * FROM ${this.table} WHERE id = ${id}`;
  }

  getCreateQuery(item: Record<string, any>) {
    const fields = Object.keys(item).map(snakeCase);
    const values = Object.values(item);

    return {
      query: `INSERT INTO ${this.table} (${fields.join(', ')}) VALUES (${fields
        .map((_, i) => `$${i + 1}`)
        .join(', ')}) RETURNING *`,
      values
    };
  }

  getCreateManyQuery(items: Record<string, any>[]) {
    const fields = Object.keys(items[0]).map(snakeCase);
    const values = items.map((item) => Object.values(item));

    return {
      query: `INSERT INTO ${this.table} (${fields.join(', ')}) VALUES ${values
        .map((_, i) => `(${fields.map((_, j) => `$${i * fields.length + j + 1}`).join(', ')})`)
        .join(', ')} RETURNING *`,
      values: values.flat()
    };
  }

  getUpdateQuery(id: number | string, item: Record<string, any>) {
    const fields = Object.keys(item).map(snakeCase);
    const values = Object.values(item);

    return {
      query: `UPDATE ${this.table} SET ${fields
        .map((field, i) => `${field} = $${i + 1}`)
        .join(', ')} WHERE id = ${id} RETURNING *`,
      values
    };
  }

  getDeleteQuery(id: number | string) {
    return `DELETE FROM ${this.table} WHERE id = ${id}`;
  }
}

export default QueryBuilder;
