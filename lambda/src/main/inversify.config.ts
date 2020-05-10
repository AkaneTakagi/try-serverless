import { Container } from "inversify";
import { PaciantRepository } from "./repository/paciant.repository";
import { REPOSITORY_TYPES } from "./repository/types";
import { PaciantRepositoryImpl } from "./repository/impl/paciant.repository.impl";
import { PaciantUsecase } from "./usecase/paciant.usecase";
import { USECASE_TYPES } from "./usecase/types";
import { PaciantUsecaseImpl } from "./usecase/impl/paciant.usecase.impl";

const container = new Container();
container.bind<PaciantRepository>(REPOSITORY_TYPES.PaciantRepository).to(PaciantRepositoryImpl);
container.bind<PaciantUsecase>(USECASE_TYPES.PaciantUsecase).to(PaciantUsecaseImpl);

export {container};