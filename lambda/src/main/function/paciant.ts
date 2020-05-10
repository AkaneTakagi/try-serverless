import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { container } from '../inversify.config';
import { PaciantUsecase } from '../usecase/paciant.usecase';
import { USECASE_TYPES } from '../usecase/types';
import { Paciant } from '../repository/paciant.repository';
import { addCorsHeader as addCorsHeaders } from './cors';

export const list: APIGatewayProxyHandler = async (event, _context) => {
    console.log('start: paciant.list', event);
    const usecase = container.get<PaciantUsecase>(USECASE_TYPES.PaciantUsecase);
    const paciants: Paciant[] = await usecase.listPaciants(event.queryStringParameters['registeredBy']);
    return {
        statusCode: 200,
        headers: addCorsHeaders(),
        body: JSON.stringify(paciants)
    };
}

export const get: APIGatewayProxyHandler = async (event, _context) => {
    console.log('start: paciant.get', event);
    const usecase = container.get<PaciantUsecase>(USECASE_TYPES.PaciantUsecase);
    const paciant: Paciant = await usecase.getPaciant(event.pathParameters['id']);
    return {
        statusCode: 200,
        headers: addCorsHeaders(),
        body: JSON.stringify(paciant)
    };
}

export const modify: APIGatewayProxyHandler = async (event, _context) => {
    console.log('start: paciant.modify', event);
    const usecase = container.get<PaciantUsecase>(USECASE_TYPES.PaciantUsecase);
    await usecase.modifyPaciant(jsonToPaciant(event.body));
    return {
        statusCode: 200,
        headers: addCorsHeaders(),
        body: JSON.stringify({ message: 'Modify Success!' })
    }
}

export const add: APIGatewayProxyHandler = async (event, _context) => {
    console.log('start: paciant.add', event);
    const usecase = container.get<PaciantUsecase>(USECASE_TYPES.PaciantUsecase);
    await usecase.addPaciant(jsonToPaciant(event.body));
    return {
        statusCode: 200,
        headers: addCorsHeaders(),
        body: JSON.stringify({ message: 'Add Success!' })
    }
}

const jsonToPaciant = (json: string): Paciant => {
    const obj = JSON.parse(json);
    return {
        id: obj.id,
        name: obj.name,
        sex: obj.sex,
        age: obj.age,
        testedAt: new Date(obj.testedAt),
        result: obj.result,
        registeredBy: obj.registeredBy
    }
}


