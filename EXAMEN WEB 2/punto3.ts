import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define las interfaces IRequest e IParameter
interface IRequest {
  id: number;
  URL: string;
  returnType: string;
  format: string;
  status: string;
  parameters: IParameter[];
}

interface IParameter {
  id: number;
  name: string;
  type: string;
  comment: string;
  requestId: number;
}

// Crea un arreglo con 3 elementos que obedecen a las interfaces
const arreglo: IRequest[] = [
  {
    id: 1,
    URL: 'https://ejemplo.com/api/1',
    returnType: 'JSON',
    format: 'GET',
    status: 'Active',
    parameters: [
      {
        id: 1,
        name: 'param1',
        type: 'string',
        comment: 'Primer parámetro',
        requestId: 1,
      },
      {
        id: 2,
        name: 'param2',
        type: 'number',
        comment: 'Segundo parámetro',
        requestId: 1,
      },
    ],
  },
  {
    id: 2,
    URL: 'https://ejemplo.com/api/2',
    returnType: 'XML',
    format: 'POST',
    status: 'Inactive',
    parameters: [
      {
        id: 3,
        name: 'param1',
        type: 'boolean',
        comment: 'Primer parámetro',
        requestId: 2,
      },
    ],
  },
  {
    id: 3,
    URL: 'https://ejemplo.com/api/3',
    returnType: 'JSON',
    format: 'PUT',
    status: 'Active',
    parameters: [
      {
        id: 4,
        name: 'param1',
        type: 'number',
        comment: 'Primer parámetro',
        requestId: 3,
      },
      {
        id: 5,
        name: 'param2',
        type: 'string',
        comment: 'Segundo parámetro',
        requestId: 3,
      },
    ],
  },
];

// Función para crear los elementos en la base de datos
async function crearElementosEnBaseDeDatos() {
  try {
    for (const elemento of arreglo) {
      // Crea el elemento en la entidad correspondiente en la base de datos
      await prisma.request.create({
        data: {
          id: elemento.id,
          URL: elemento.URL,
          returnType: elemento.returnType,
          format: elemento.format,
          status: elemento.status,
          parameters: {
            create: elemento.parameters.map((param) => ({
              id: param.id,
              name: param.name,
              type: param.type,
              comment: param.comment,
              requestId: param.requestId,
            })),
          },
        },
      });
    }
    console.log('Elementos creados en la base de datos.');
  } catch (error) {
    console.error('Error al crear elementos en la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Llama a la función para crear elementos en la base de datos
crearElementosEnBaseDeDatos();
