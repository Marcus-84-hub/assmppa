
import React from 'react';
import { InfrastructureItem, ProfessionalRow, InspectionData } from './types';

export const INITIAL_PROFESSIONALS: ProfessionalRow[] = [
  { cargo: 'Professor', qt: '', efetivo: '', contratado: '', terceirizado: '' },
  { cargo: 'Coordenador Pedagógico', qt: '', efetivo: '', contratado: '', terceirizado: '' },
  { cargo: 'Administrativo', qt: '', efetivo: '', contratado: '', terceirizado: '' },
  { cargo: 'Apoio (Servente)', qt: '', efetivo: '', contratado: '', terceirizado: '' },
  { cargo: 'Merendeira', qt: '', efetivo: '', contratado: '', terceirizado: '' },
  { cargo: 'Agente de Portaria', qt: '', efetivo: '', contratado: '', terceirizado: '' },
  { cargo: 'Vigia', qt: '', efetivo: '', contratado: '', terceirizado: '' },
];

export const INITIAL_INFRA: InfrastructureItem[] = [
  { id: '1', label: 'Biblioteca / Brinquedoteca', exists: null, quantity: '' },
  { id: '2', label: 'Sala de Professores', exists: null, quantity: '' },
  { id: '3', label: 'Coordenação Pedagógica', exists: null, quantity: '' },
  { id: '4', label: 'Sala de Informática', exists: null, quantity: '' },
  { id: '5', label: 'Sala Multifuncional / AEE', exists: null, quantity: '' },
  { id: '6', label: 'Sala de Vídeo', exists: null, quantity: '' },
  { id: '7', label: 'Quadra de Esporte', exists: null, quantity: '' },
  { id: '8', label: 'Área de Recreação', exists: null, quantity: '' },
  { id: '9', label: 'Cozinha / Refeitório', exists: null, quantity: '' },
  { id: '10', label: 'Auditório', exists: null, quantity: '' },
  { id: '11', label: 'Direção', exists: null, quantity: '' },
];

export const EMPTY_INSPECTION: InspectionData = {
  id: Date.now().toString(),
  status: 'draft',
  lastSync: new Date().toLocaleString(),
  school: {
    nome: '', use: '', endereco: '', bairro: '', telefone: '', email: '', municipio: '', coordenadas: '', diretor: '', telefoneDiretor: '', emailDiretor: '', viceDiretor: '',
    esfera: '', convenio: '', qtdSalas: '', qtdAlunos: '', nivelEnsino: '',
    distribuicao: {
      turmas: { manha: '', tarde: '', noite: '' },
      alunos: { manha: '', tarde: '', noite: '' }
    },
    dataVistoria: new Date().toISOString().split('T')[0]
  },
  professionals: INITIAL_PROFESSIONALS,
  infra: INITIAL_INFRA,
  administrative: {
    condition: '', cleaningSatisfactory: null, hasForro: null, forroCondition: '', hasPiso: null, pisoCondition: '',
    studentExcess: null, excessCount: '', furnitureSufficient: null, furnitureCondition: null, furnitureDestros: null,
    equipmentFunctional: { quadros: null, ventiladores: null, arCondicionado: null },
    lighting: { geral: null, natural: null, lamps: null },
    accessibility: '',
    transport: { hasTransport: null, goodCondition: null, meetsDemand: null },
    infantil: { materials: null, movement: null, furnitureProportional: null, separateKitchen: null }
  },
  pedagogical: {
    teacherShortage: null, disciplines: '', electedDirection: null, hasGremio: '', hasPPP: null, pppUpdated: null,
    learningDifficulties: null, reforcoEscolar: null, parentMeetings: null, meetingFrequency: '', communityInteraction: null,
    noClassesOften: '', substituteActivities: '', threats: null, threatsNotes: '', violence: null, violenceNotes: '',
    training: null, nearbyEstablishments: null
  },
  finance: { federalResources: null, resourcesOrigin: '', councilActive: null, fiscalCouncil: null, fundoRotativo: null, lastCycleValue: '' },
  observations: { notes: '', dateTime: '', interviewees: '', responsible: '', signature: null },
  photos: []
};
