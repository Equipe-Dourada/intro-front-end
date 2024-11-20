import { NextFunction, Request, Response } from 'express';
import { MedicoService } from "../services/MedicoService";

class MedicoController {
    private medicoService: MedicoService;

    constructor() {
        this.medicoService = new MedicoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { crm, nome, especialidade } = req.body;
            this.validateCrm(crm);
            const validation = this.isValidInput(nome, especialidade);
            if(!validation.isValid) {
                res.status(400).json({error: validation.msg});
            }
            const medico = await this.medicoService.create(crm, nome, especialidade);
            res.status(201).json(medico);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Medico.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const crm = req.params.id;
            this.validateCrm(crm);
            const { nome, especialidade } = req.body;
            const validation = this.isValidInput(nome, especialidade);
            if(!validation.isValid) {
                res.status(400).json({error: validation.msg});
            }
            const medico = await this.medicoService.update(crm, nome, especialidade);
            res.status(200).json(medico);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Medico.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const crm = req.params.id;
            this.validateCrm(crm);
            await this.medicoService.delete(crm);
            res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Medico.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicos = await this.medicoService.getAll();
            res.status(200).json(medicos);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos Medicos.");
        }
    }

    getByCrm = async (req: Request, res: Response) => {
        try {
            const crm = req.params.id;
            this.validateCrm(crm);
            const medico = await this.medicoService.getByCrm(crm);
            res.status(200).json(medico);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Medico pelo CRM.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const medico = await this.medicoService.getByCrm(id);
            if (!medico) {
                res.status(404).json({ error: "Medico não encontrado." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Medico.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg} ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Erro inesperado: ${error}`);
            return res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }

    private validateCrm(crm: string) {
        if (crm.length != 6) {
            throw new Error("CRM Inválido.");
        }
    }

    private isValidInput(nome: any, especialidade: any) {
        if(typeof nome !== "string" || nome.trim().length == 0) {
            return {isValid: false, msg: "Invalid nome: must be a non empty string."}
        }
        if(typeof especialidade !== "string" || especialidade.trim().length == 0) {
            return {isValid: false, msg: "Invalid especialidade: must be a non empty string."}
        }
        return  {isValid: true };
    }
}

export { MedicoController };
