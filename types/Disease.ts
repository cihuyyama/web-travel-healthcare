export type Symptom = {
    id: number;
    symptom_name: string;
    symptom_char: string;
  };
  
  export type Treatment = {
    id: number;
    disease_id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  
  export type Prevention = {
    id: number;
    disease_id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  
  export type Disease = {
    id: number;
    disease_name: string;
    disease_desc: string;
    DiseaseSymptom: Symptom[];
    Treatment: Treatment[];
    Prevention: Prevention[];
    created_at: string;
    updated_at: string;
  };