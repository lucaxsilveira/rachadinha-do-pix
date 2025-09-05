"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Plus } from "lucide-react";
import Image from "next/image";
// import { payload } from "pix-payload";
// import { QrCodePix } from "qrcode-pix";
import { use, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
// import { QRCode } from "react-qrcode-logo";
import QRCode from "react-qr-code";
import { z } from "zod";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Pix } from "@/core/pix";
import { copyToClipboard, currency } from "@/utils/helpers";
import Logo from "./logo";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface CreateStepProps {
  title: string;
  total: number;
  pixKey: string;
  totalPaid: number;
  onTitleChange: (value: string) => void;
  onTotalChange: (value: number) => void;
  onPixKeyChange: (value: string) => void;
  onSubmit: () => void;
}

const formSchema = z.object({
  pixKey: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function CreateStep({
  title,
  total,
  pixKey,
  totalPaid,
  onTitleChange,
  onTotalChange,
  onPixKeyChange,
}: // onSubmit,
CreateStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"livre" | "igualmente">(
    "livre"
  );
  // const [valor, setValor] = useState("10.00");

  // const data = {
  //   key: "01317442083",
  //   name: "xxxa1",
  //   city: "Sao Paulo",
  //   // amount: 150,
  //   transactionId: "PAY123",
  // };

  // const qrCodeValue = new Pix(data).payload;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pixKey: "",
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      onSubmit();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyDraft = async () => {
    const draft = `${title} — ${currency(total)} — PIX: ${pixKey}`;
    await copyToClipboard(draft);
    alert("Rascunho copiado!");
  };

  const progress = Math.min(100, Math.round((totalPaid / (total || 1)) * 100));

  // const qrCodePix = QrCodePix({
  //   version: "01",
  //   key: "01317442083", //or any PIX key
  //   name: "Fulano de Tal",
  //   city: "Canela",
  //   transactionId: "01333212", //max 25 characters
  //   message: "Pay me :)",
  //   cep: "95688600",
  //   value: 150.99,
  // });

  // const image = async () => {
  //   const base64 = await qrCodePix.base64();
  //   setImgBase64(base64);
  // };

  // useEffect(() => {
  //   image();
  // }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="">
        {/* <h1 className="text-3xl font-bold mb-2">Rachadinha</h1> */}

        {/* <Logo fill="#1A5E35" /> */}
        <div className="flex flex-col items-center">
          <Image src={logo} alt="" width={100} height={100} />
          <p className="text-gray-600 text-center mt-4">Evite o calote.</p>
          <p className="text-gray-600 mb-6 text-center">
            Crie um link para a galera contribuir no PIX.
          </p>
        </div>

        <Form {...form}>
          <div className="mt-8 flex items-center justify-center flex-col">
            <Label htmlFor="title" className="text-xl text-gray-500 mb-4">
              Valor
            </Label>
            {/* <Input
            id="total"
            type="number"
            min={1}
            value={total}
            onChange={(e) => onTotalChange(Number(e.target.value))}
            placeholder="Ex: 300"
            aria-describedby="total"
            className="bg-transparent text-4xl font-bold mb-4 border-0"
          /> */}
            <div className="price-input">
              <CurrencyInput
                name="amount"
                placeholder="0,00"
                decimalSeparator=","
                groupSeparator="."
                defaultValue={1000}
                decimalsLimit={2}
                prefix="R$"
                onValueChange={(value, name, values) =>
                  console.log(value, name, values)
                }
              />
            </div>
          </div>

          {/* <QRCode value={qrCodeValue} size={256} /> */}

          <Card className="shadow-lg shadow-gray-700 space-y-4 absolute bottom-0 left-0 right-0 rounded-b-none min-h-[50%] flex flex-col">
            <div>
              <Textarea
                className="min-h-20"
                placeholder="caloteiros merecem uma mensagem amigável ..."
              />
            </div>

            <FormItem>
              <FormLabel>Sua chave PIX</FormLabel>
              <FormControl>
                <Input
                  id="pixKey"
                  value={pixKey}
                  className="h-12"
                  onChange={(e) => onPixKeyChange(e.target.value)}
                  placeholder="E-mail, CPF, celular ou aleatória"
                  aria-describedby="pix-help"
                />
              </FormControl>
            </FormItem>

            <div>
              <FormLabel className="mb-2">Método de divisão</FormLabel>
              <div className="font-bold uppercase text-xs bg-gray-200 grid gap-4 grid-cols-2 rounded-full p-1 border relative">
                <div
                  className={`absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ease-in-out ${
                    selectedOption === "livre"
                      ? "left-1 right-1/2 mr-2"
                      : "left-1/2 right-1 ml-2"
                  }`}
                />
                <button
                  type="button"
                  className={`text-center rounded-full px-2 py-1 relative z-10 cursor-pointer transition-colors duration-300 ${
                    selectedOption === "livre" ? "text-white" : "text-gray-500"
                  }`}
                  onClick={() => setSelectedOption("livre")}
                >
                  livre
                </button>
                <button
                  type="button"
                  className={`text-center rounded-full px-2 py-1 relative z-10 cursor-pointer transition-colors duration-300 ${
                    selectedOption === "igualmente"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                  onClick={() => setSelectedOption("igualmente")}
                >
                  igualmente
                </button>
              </div>
            </div>

            <FormItem>
              <FormLabel>Dividir entre quantas pessoas?</FormLabel>
              <FormControl>
                <Input
                  id="splitBetween"
                  className="h-12"
                  placeholder="0"
                  type="number"
                />
              </FormControl>
            </FormItem>

            <div className="mt-auto">
              <Button
                onClick={handleSubmit}
                // xdisabled={isLoading || !pixKey}
                className="w-full h-[50px] "
              >
                {isLoading ? "Criando..." : "Criar Rachadinha"}
              </Button>
            </div>
          </Card>
        </Form>
      </div>

      {/* <div>
        <Card>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            Prévia
          </div>
          <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{title}</h3>
              <span className="text-sm text-gray-500">
                Meta: {currency(total)}
              </span>
            </div>

            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-[#9B5DE5] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-sm text-gray-600">
              Arrecadado: {currency(totalPaid)}
            </div>
          </div>
        </Card>
      </div> */}
    </div>
  );
}
