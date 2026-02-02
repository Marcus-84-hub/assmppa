
export interface SchoolInfo {
  nome: string;
  inep?: string;
  use: string;
  endereco: string;
  bairro: string;
  telefone: string;
  email: string;
  municipio: string;
  coordenadas: string;
  diretor: string;
  telefoneDiretor: string;
  emailDiretor: string;
  viceDiretor: string;
  esfera: 'Estadual' | 'Municipal' | '';
  convenio: 'Sim' | 'Não' | 'SEI' | '';
  qtdSalas: string;
  qtdAlunos: string;
  nivelEnsino: string;
  distribuicao: {
    turmas: { manha: string; tarde: string; noite: string };
    alunos: { manha: string; tarde: string; noite: string };
  };
  dataVistoria: string;
}

export interface ProfessionalRow {
  cargo: string;
  qt: string;
  efetivo: string;
  contratado: string;
  terceirizado: string;
}

export interface InfrastructureItem {
  id: string;
  label: string;
  exists: boolean | null;
  quantity: string;
}

export interface PhotoEntry {
  id: string;
  url: string;
  category: string;
  description: string;
  filename: string;
  size: string;
}

export interface InspectionData {
  id: string;
  status: 'draft' | 'completed';
  lastSync: string;
  school: SchoolInfo;
  professionals: ProfessionalRow[];
  infra: InfrastructureItem[];
  administrative: {
    condition: string;
    cleaningSatisfactory: boolean | null;
    hasForro: boolean | null;
    forroCondition: string;
    hasPiso: boolean | null;
    pisoCondition: string;
    studentExcess: boolean | null;
    excessCount: string;
    furnitureSufficient: boolean | null;
    furnitureCondition: boolean | null;
    furnitureDestros: boolean | null;
    equipmentFunctional: {
      quadros: boolean | null;
      ventiladores: boolean | null;
      arCondicionado: boolean | null;
    };
    lighting: {
      geral: boolean | null;
      natural: boolean | null;
      lamps: boolean | null;
    };
    accessibility: string;
    transport: {
      hasTransport: boolean | null;
      goodCondition: boolean | null;
      meetsDemand: boolean | null;
    };
    infantil: {
      materials: boolean | null;
      movement: boolean | null;
      furnitureProportional: boolean | null;
      separateKitchen: boolean | null;
    };
  };
  pedagogical: {
    teacherShortage: boolean | null;
    disciplines: string;
    electedDirection: boolean | null;
    hasGremio: string;
    hasPPP: boolean | null;
    pppUpdated: boolean | null;
    learningDifficulties: boolean | null;
    reforcoEscolar: boolean | null;
    parentMeetings: boolean | null;
    meetingFrequency: string;
    communityInteraction: boolean | null;
    noClassesOften: string;
    substituteActivities: string;
    threats: boolean | null;
    threatsNotes: string;
    violence: boolean | null;
    violenceNotes: string;
    training: boolean | null;
    nearbyEstablishments: boolean | null;
  };
  finance: {
    federalResources: boolean | null;
    resourcesOrigin: string;
    councilActive: boolean | null;
    fiscalCouncil: boolean | null;
    fundoRotativo: boolean | null;
    lastCycleValue: string;
  };
  observations: {
    notes: string;
    dateTime: string;
    interviewees: string;
    responsible: string;
    signature: string | null;
  };
  photos: PhotoEntry[];
}
