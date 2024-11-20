import { NextFunction, Request, Response } from 'express';
import { PacienteService } from "../services/PacienteService";

class PacienteController {
    private pacienteService: PacienteService;

    constructor() {
        this.pacienteService = new PacienteService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { cpf, nome, idade } = req.body;
            this.validateCpf(cpf);
            const validation = this.isValidInput(nome, idade);
            if(!validation.isValid) {
                res.status(400).json({error: validation.msg});
            }
            const paciente = await this.pacienteService.create(cpf, nome, idade);
            res.status(201).json(paciente);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Paciente.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.id;
            this.validateCpf(cpf);
            const { nome, idade } = req.body;
            const validation = this.isValidInput(nome, idade);
            if(!validation.isValid) {
                res.status(400).json({error: validation.msg});
            }
            const paciente = await this.pacienteService.update(cpf, nome, idade);
            res.status(200).json(paciente);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Paciente.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.id;
            this.validateCpf(cpf);
            await this.pacienteService.delete(cpf);
            res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Paciente.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const pacientes = await this.pacienteService.getAll();
            res.status(200).json(pacientes);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos Pacientes.");
        }
    }

    getByCpf = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.id;
            this.validateCpf(cpf);
            const paciente = await this.pacienteService.getByCpf(cpf);
            res.status(200).json(paciente);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Paciente pelo CPF.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const paciente = await this.pacienteService.getByCpf(id);
            if (!paciente) {
                res.status(404).json({ error: "Paciente não encontrado." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Paciente.");
        }
    }

    private handleError(res: Response, error: unknown, message: string) {
        if (error instanceof Error) {
            console.error(`${message} ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Erro inesperado: ${error}`);
            return res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }

    private validateCpf(cpf: string) {
        if (cpf.length !== 11) {
            throw new Error("CPF Inválido.");
        }
    }

    private isValidInput(nome: any, idade: any) {
        if(typeof nome !== "string" || nome.trim().length == 0) {
            return {isValid: false, msg: "Invalid nome: must be a non empty string."}
        }
        if (typeof idade !== "number" || idade < 0) {
            return { isValid: false, msg: "Invalid idade: must be a positive number." };
        }
        return  {isValid: true };
    }
}

export { PacienteController };
