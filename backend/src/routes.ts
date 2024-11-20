import { Router } from 'express';
import { MedicoController } from "./controllers/MedicoController";
import { PacienteController } from "./controllers/PacienteController";

const routes = Router();
const path = '/stp';

const medicoController = new MedicoController();
const pacienteController = new PacienteController();

routes.get(`${path}/medicos`, medicoController.getAll);
routes.get(`${path}/medicos/:id`, medicoController.getByCrm);
routes.post(`${path}/medicos`, medicoController.create);
routes.put(`${path}/medicos/:id`, medicoController.verifyIfExists, medicoController.update);
routes.delete(`${path}/medicos/:id`, medicoController.verifyIfExists, medicoController.delete);

routes.get(`${path}/pacientes`, pacienteController.getAll);
routes.get(`${path}/pacientes/:id`, pacienteController.getByCpf);
routes.post(`${path}/pacientes`, pacienteController.create);
routes.put(`${path}/pacientes/:id`, pacienteController.verifyIfExists, pacienteController.update);
routes.delete(`${path}/pacientes/:id`, pacienteController.verifyIfExists, pacienteController.delete);

export { routes };
