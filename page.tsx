
"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const mockTimeSlots = [
  "09:00 - 09:15",
  "09:15 - 09:30",
  "09:30 - 09:45",
  "09:45 - 10:00",
  "10:00 - 10:15",
  "10:15 - 10:30",
  "10:30 - 10:45",
  "10:45 - 11:00",
  "11:00 - 11:15",
  "11:15 - 11:30",
];

export default function BreakScheduler() {
  const [name, setName] = useState("");
  const [slot, setSlot] = useState("");
  const [type, setType] = useState("break");
  const [selections, setSelections] = useState([]);

  const handleBook = () => {
    if (!name || !slot || !type) return;
    setSelections([...selections, { name, slot, type, date: format(new Date(), "yyyy-MM-dd") }]);
    setSlot("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">🕒 Планировщик перерывов</h2>

          <Input placeholder="Имя оператора" value={name} onChange={(e) => setName(e.target.value)} />

          <Select value={slot} onValueChange={setSlot}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите слот" />
            </SelectTrigger>
            <SelectContent>
              {mockTimeSlots.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="break">Брейк</SelectItem>
              <SelectItem value="lunch">Ланч</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleBook} className="w-full">Забронировать</Button>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">📋 Выбранные слоты</h3>
          {selections.length === 0 && <p className="text-muted-foreground">Нет бронирований</p>}
          {selections.map((s, idx) => (
            <div key={idx} className="border-b py-2 text-sm flex justify-between">
              <span>{s.date} — <strong>{s.slot}</strong> ({s.type})</span>
              <span className="text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
