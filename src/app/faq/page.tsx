// src/app/faq/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    id: "faq1",
    question: "¿Cómo solicito un viaje accesible en WheelTaxi?",
    answer: "Es muy sencillo. En la pantalla principal de la aplicación, encontrarás un campo que dice '¿A dónde vamos hoy?'. Ingresa tu destino allí y luego presiona el botón 'Buscar Viaje'. La aplicación buscará conductores con vehículos adaptados cercanos y te mostrará las opciones disponibles.",
  },
  {
    id: "faq2",
    question: "¿Qué tipos de adaptaciones tienen los vehículos de WheelTaxi?",
    answer: "Nuestros vehículos asociados están equipados para la accesibilidad. Esto puede incluir rampas para sillas de ruedas, suficiente espacio interior para maniobrar, sistemas de anclaje y sujeción para sillas de ruedas, y otras modificaciones. Además, los conductores reciben capacitación para asistir a pasajeros con diversas necesidades de movilidad.",
  },
  {
    id: "faq3",
    question: "¿Cómo se calcula la tarifa de un viaje?",
    answer: "La tarifa se basa en varios factores: la distancia del viaje, el tiempo estimado de duración, una tarifa base del servicio, y un pequeño cargo adicional por accesibilidad. Este cargo adicional nos ayuda a mantener la calidad de los vehículos adaptados y la capacitación continua de los conductores.",
  },
  {
    id: "faq4",
    question: "¿Puedo programar un viaje con anticipación?",
    answer: "Actualmente, la función para programar viajes con antelación está en nuestra hoja de ruta de desarrollo. Por el momento, todos los viajes se solicitan en tiempo real para asegurar la disponibilidad inmediata.",
  },
  {
    id: "faq5",
    question: "¿Qué debo hacer si tengo un problema o emergencia durante mi viaje?",
    answer: "Tu seguridad es nuestra prioridad. En la aplicación, encontrarás un botón SOS destacado. Al presionarlo, se notificará a tus contactos de emergencia predefinidos y a nuestro equipo de soporte. También puedes comunicarte directamente con el conductor a través de las opciones de mensaje o llamada disponibles en la pantalla de detalle del viaje.",
  },
  {
    id: "faq6",
    question: "¿Cómo puedo actualizar mi información de perfil?",
    answer: "Puedes actualizar tu nombre, correo electrónico y número de teléfono dirigiéndote a la sección 'Mi Perfil' en el menú lateral de la aplicación. Asegúrate de guardar los cambios después de editar tu información.",
  },
  {
    id: "faq7",
    question: "¿Qué son los puntos de lealtad y cómo los obtengo?",
    answer: "Los puntos de lealtad se otorgan por cada viaje que completas con WheelTaxi. Estos puntos se pueden canjear por recompensas, como descuentos en viajes o acceso prioritario. Puedes consultar tu saldo de puntos y las recompensas disponibles en la sección 'Mis Recompensas'.",
  }
];

export default function FaqPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 max-w-3xl mx-auto">
        <Link href="/support" passHref>
          <Button variant="outline" size="sm" className="text-sm border-border/70 hover:bg-muted/50">
            <ChevronLeft className="mr-1.5 h-4 w-4" />
            Volver a Soporte
          </Button>
        </Link>
      </div>
      <Card className="max-w-3xl mx-auto shadow-lg border-border/70 rounded-xl bg-card">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center text-2xl font-semibold text-foreground">
            <HelpCircle className="mr-3 h-7 w-7 text-primary" />
            Preguntas Frecuentes (FAQ)
          </CardTitle>
          <CardDescription className="text-card-foreground/80">Encuentra respuestas a las consultas más comunes sobre el uso de WheelTaxi.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq) => (
                <AccordionItem value={faq.id} key={faq.id} className="border border-border/50 rounded-md bg-card shadow-sm hover:shadow-md transition-shadow data-[state=open]:bg-muted/20">
                  <AccordionTrigger className="text-left hover:no-underline px-4 py-3 text-base font-medium text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4 pb-4 pt-1 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground text-center py-8">No hay preguntas frecuentes disponibles en este momento.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
