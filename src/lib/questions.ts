// Preguntas del test. Los `value` son los códigos que acepta la API del CRM (POST /api/v1/particulares):
// si cambias uno aquí, cámbialo también allí.
// Base legal: Texto Refundido de la Ley Concursal tras la Ley 16/2022 (arts. 2, 487, 488 y 489).
export type Answers = {
  debt: string;
  creditors: string;
  can_pay: string;
  public_debt: string;
  special_debt: string;
  income: string;
  employment: string;
  home: string;
  blockers: string;
};
export type Question = { id: keyof Answers; title: string; hint?: string; options: { label: string; value: string }[] };

export const QUESTIONS: Question[] = [
  {
    id: "debt",
    title: "¿Cuánto debes en total, más o menos?",
    hint: "Suma préstamos, tarjetas, microcréditos, Hacienda, Seguridad Social…",
    options: [
      { label: "Menos de 8.000 €", value: "5000" },
      { label: "Entre 8.000 y 15.000 €", value: "11000" },
      { label: "Entre 15.000 y 30.000 €", value: "22000" },
      { label: "Entre 30.000 y 60.000 €", value: "45000" },
      { label: "Más de 60.000 €", value: "80000" },
    ],
  },
  {
    id: "creditors",
    title: "¿A cuántas entidades les debes dinero?",
    hint: "Bancos, financieras, tiendas, Hacienda, particulares…",
    options: [
      { label: "Solo a una", value: "1" },
      { label: "A dos", value: "2" },
      { label: "A tres o cuatro", value: "3" },
      { label: "A cinco o más", value: "5" },
    ],
  },
  {
    id: "can_pay",
    title: "¿Puedes pagar tus cuotas cada mes?",
    options: [
      { label: "Sí, sin problema", value: "si" },
      { label: "Pago, pero pidiendo más dinero o sin llegar a fin de mes", value: "justo" },
      { label: "No, ya tengo impagos o embargos", value: "no" },
    ],
  },
  {
    id: "public_debt",
    title: "¿Qué parte de tu deuda es con Hacienda, la Seguridad Social o el ayuntamiento?",
    hint: "La ley solo cancela una parte de estas deudas.",
    options: [
      { label: "Nada o casi nada", value: "nada" },
      { label: "Menos de la mitad", value: "menos" },
      { label: "Más de la mitad", value: "mas" },
      { label: "Casi todo", value: "casi_todo" },
    ],
  },
  {
    id: "special_debt",
    title: "¿Alguna de tus deudas es de estos tipos?",
    options: [
      { label: "Ninguna", value: "ninguna" },
      { label: "Pensión de alimentos", value: "alimentos" },
      { label: "Indemnización por un delito o por daños a personas", value: "indemnizacion" },
      { label: "Multas penales o sanciones muy graves", value: "multas" },
    ],
  },
  {
    id: "income",
    title: "¿Cuánto entra en casa al mes?",
    options: [
      { label: "Ahora mismo nada", value: "0" },
      { label: "Menos de 1.000 €", value: "800" },
      { label: "Entre 1.000 y 1.500 €", value: "1250" },
      { label: "Entre 1.500 y 2.500 €", value: "2000" },
      { label: "Más de 2.500 €", value: "3000" },
    ],
  },
  {
    id: "employment",
    title: "¿Cuál es tu situación laboral?",
    options: [
      { label: "Trabajo por cuenta ajena", value: "asalariado" },
      { label: "Soy autónomo", value: "autonomo" },
      { label: "Estoy en paro", value: "desempleado" },
      { label: "Soy pensionista", value: "pensionista" },
    ],
  },
  {
    id: "home",
    title: "¿Tienes una vivienda en propiedad?",
    options: [
      { label: "No", value: "no" },
      { label: "Sí", value: "si" },
    ],
  },
  {
    id: "blockers",
    title: "¿Te pasa alguna de estas cosas?",
    hint: "Si te pasa más de una, elige la primera de la lista.",
    options: [
      { label: "Ninguna", value: "ninguna" },
      { label: "Me cancelaron deudas con esta ley hace menos de 2 años", value: "lso_2" },
      { label: "Me cancelaron deudas con esta ley hace entre 2 y 5 años", value: "lso_5" },
      { label: "Condena firme por un delito económico en los últimos 10 años", value: "condena" },
      { label: "Sanción muy grave de Hacienda o Seguridad Social sin pagar", value: "sancion" },
      { label: "Un concurso de acreedores mío o de mi empresa se declaró culpable", value: "culpable" },
    ],
  },
];

/** Comprueba que todas las respuestas existen y son opciones válidas. */
export function validAnswers(a: Partial<Answers>): a is Answers {
  return QUESTIONS.every((q) => q.options.some((o) => o.value === a[q.id]));
}

/** Mismos nombres que usa el CRM para repartir por provincia. */
export const PROVINCES = [
  "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Baleares", "Barcelona", "Bizkaia", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ceuta", "Ciudad Real", "Córdoba", "Cuenca", "Gipuzkoa", "Girona", "Granada", "Guadalajara", "Huelva",
  "Huesca", "Jaén", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Melilla", "Murcia", "Navarra",
  "Ourense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo",
  "Valencia", "Valladolid", "Zamora", "Zaragoza",
];
