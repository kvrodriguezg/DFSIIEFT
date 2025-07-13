import { Injectable } from '@angular/core';
/**
 * Servicio para gestionar las recetas favoritas de los usuarios.
 * Se encarga de obtener, guardar y alternar el estado de favoritos usando localStorage.
 *
 * @export
 * @class FavoritosService
 */
@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  recetasPorCategoria: any = {
    desayunos: [
      {
        nombre: 'Tostadas Francesas con Frutas y Sirope de Arce',
        imagen: 'assets/img/tostadas_francesas.png',
        modalId: 'tostadasFrancesasModal',
        descripcion: 'Un clásico reconfortante y versátil, ideal para empezar el día con energía.',
        tiempoPreparacion: '10 minutos',
        tiempoCoccion: '10-15 minutos',
        porciones: '2',
        ingredientes: [
          '4 rebanadas de pan de molde',
          '2 huevos grandes',
          '120 ml (1/2 taza) de leche',
          '1 cucharadita de extracto de vainilla',
          '½ cucharadita de canela en polvo',
          'Una pizca de nuez moscada (opcional)',
          '1 cucharada de azúcar (opcional)',
          '1 cucharada de mantequilla o aceite vegetal'
        ],
        servir: [
          'Frutas frescas (frutos rojos, plátano, kiwi)',
          'Sirope de arce o miel',
          'Azúcar glas (opcional)'
        ],
        instrucciones: [
          'Bate los huevos con leche, vainilla, canela, nuez moscada y azúcar.',
          'Sumerge el pan en la mezcla sin que se deshaga.',
          'Calienta mantequilla en sartén a fuego medio.',
          'Dora cada lado 2-4 minutos hasta crujiente.',
          'Sirve con frutas, sirope de arce y azúcar glas si deseas.'
        ]
      }
    ],
    almuerzos: [
      {
        nombre: 'Bowl de Curry de Lentejas Rojo Rápido',
        imagen: 'assets/img/curry_lentejas.png',
        modalId: 'curryLentejasModal',
        descripcion: 'Un curry reconfortante y lleno de sabor, perfecto para un almuerzo caliente y nutritivo.',
        tiempoPreparacion: '10 minutos',
        tiempoCoccion: '25-30 minutos',
        porciones: '3-4',
        ingredientes: [
          '1 cucharada de aceite de coco o vegetal',
          '1 cebolla mediana, picada',
          '2 dientes de ajo, picados',
          '1 trozo de jengibre (2 cm), rallado',
          '1 cucharada de pasta de curry rojo',
          '1 lata de tomate triturado',
          '1 lata de leche de coco',
          '1 taza de lentejas rojas, enjuagadas',
          '3 tazas de caldo de verduras',
          '1 zanahoria en cubos',
          '1 taza de espinacas frescas',
          'Sal y pimienta al gusto'
        ],
        servir: [
          'Arroz basmati o integral',
          'Cilantro fresco picado',
          'Gajos de limón o lima (opcional)'
        ],
        instrucciones: [
          'Sofríe la cebolla con aceite hasta transparente.',
          'Agrega ajo y jengibre, cocina 1-2 minutos más.',
          'Añade pasta de curry, mezcla 1 minuto.',
          'Incorpora tomate y leche de coco.',
          'Agrega lentejas y caldo, cocina 15-20 minutos.',
          'A mitad, incorpora la zanahoria.',
          'Al final, añade espinacas y mezcla.',
          'Corrige sazón y sirve caliente con arroz y cilantro.'
        ]
      }
    ],
    veganas: [
      {
        nombre: 'Tacos de Lentejas Especiadas con Salsa de Aguacate y Cilantro',
        imagen: 'assets/img/tacos_lentejas.png',
        modalId: 'tacosLentejasModal',
        descripcion: 'Una opción vegana sabrosa, nutritiva y con un toque mexicano, perfecta para un almuerzo o cena ligera.',
        tiempoPreparacion: '15 minutos',
        tiempoCoccion: '25-30 minutos',
        porciones: '4-6',
        ingredientes: [
          '1 cucharada de aceite de oliva',
          '1 cebolla mediana, picada finamente',
          '2 dientes de ajo, picados',
          '1 pimiento rojo en cubos',
          '1 taza de lentejas pardinas o verdes, enjuagadas',
          '3 tazas de caldo de verduras',
          '1 lata (400g) de tomate triturado',
          '1 cucharadita de comino',
          '1 cucharadita de pimentón dulce',
          '½ cucharadita de chile en polvo',
          '1 cucharadita de orégano seco',
          'Sal y pimienta al gusto'
        ],
        servir: [
          'Tortillas de maíz o trigo',
          'Lechuga picada',
          'Tomate en cubos',
          'Cebolla morada picada',
          'Gajos de limón/lima'
        ],
        instrucciones: [
          'Sofríe cebolla, luego ajo y pimiento.',
          'Agrega especias y tomate, mezcla.',
          'Agrega lentejas y caldo, cocina 25 min.',
          'Procesa aguacate, cilantro, limón, agua y sal para salsa.',
          'Calienta tortillas y arma los tacos con todos los ingredientes.'
        ]
      }
    ],
    postres: [
      {
        nombre: 'Mousse de Chocolate Clásico (sin huevo crudo)',
        imagen: 'assets/img/mousse_chocolate.png',
        modalId: 'mousseChocolateModal',
        descripcion: 'Un postre elegante y cremoso, perfecto para cualquier ocasión.',
        tiempoPreparacion: '20 minutos',
        tiempoCoccion: 'Refrigeración: 2-4 horas',
        porciones: '4-6',
        ingredientes: [
          '200g de chocolate semi-amargo (mínimo 60% cacao), picado',
          '100ml de leche entera',
          '50g de azúcar',
          '300ml de crema de leche (mín. 35% grasa), fría',
          '1 cucharadita de vainilla',
          'Una pizca de sal (opcional)'
        ],
        servir: [
          'Virutas de chocolate',
          'Cacao en polvo',
          'Frutos rojos',
          'Crema batida'
        ],
        instrucciones: [
          'Calienta la leche y derrite el chocolate con azúcar.',
          'Enfría la mezcla y agrega vainilla y sal.',
          'Bate la crema a picos suaves.',
          'Integra suavemente con la mezcla de chocolate.',
          'Refrigera mínimo 2-4 horas.',
          'Sirve decorando a gusto.'
        ]
      },
      {
        nombre: 'Brownies de Chocolate con Nuez (Súper Húmedos)',
        imagen: 'assets/img/brownies_chocolate.png',
        modalId: 'brownieModal',
        descripcion: 'Un clásico irresistible, perfectos para compartir o para un antojo dulce.',
        tiempoPreparacion: '15 minutos',
        tiempoCoccion: '25-30 minutos',
        porciones: '9-12',
        ingredientes: [
          '125g de mantequilla sin sal',
          '150g de chocolate semi-amargo (mínimo 60% cacao)',
          '2 huevos grandes',
          '200g de azúcar',
          '1 cucharadita de vainilla',
          '75g de harina todo uso',
          '30g de cacao en polvo sin azúcar',
          '½ cucharadita de sal',
          '100g de nueces picadas (opcional)'
        ],
        servir: [
          'Pueden servirse con helado o frutas frescas'
        ],
        instrucciones: [
          'Precalienta el horno a 180°C, engrasa molde 20x20.',
          'Derrite mantequilla con chocolate, deja entibiar.',
          'Bate huevos, azúcar y vainilla.',
          'Mezcla con chocolate derretido.',
          'Agrega harina, cacao y sal tamizados.',
          'Incorpora nueces.',
          'Vierte en molde y hornea 25-30 min.',
          'Enfría antes de cortar para mejor textura.'
        ]
      }
    ]
  };

  constructor() { }

  getRecetasPorCategoria() {
    return this.recetasPorCategoria;
  }
}