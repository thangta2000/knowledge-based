import "./App.css";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Age } from "./lib/constant";
import { Gender } from "./lib/type";
import { calculate } from "./lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { useState } from "react";

function App() {
  const [result, setResult] = useState("");

  const formSchema = z.object({
    gender: z.string(),
    age: z.string(),
    weight: z.string(),
    height: z.string(),
    force: z.string(),
    jump: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { gender, age, weight, height, force, jump } = values;

    const weightValue = Number(weight);
    const heightValue = Number(height);
    const forceValue = Number(force);
    const jumpValue = Number(jump);

    const status = calculate({
      age: age as Age,
      gender: gender as Gender,
      weightValue,
      heightValue,
      forceValue,
      jumpValue,
    });

    setResult(status)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-600 text-center leading-7" style={{ textWrap: "balance" }}>
          Hệ thống đánh giá chỉ số phát triển của trẻ em
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Nhập giới tính" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Tuổi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tuổi" {...field} type="number" min={1} max={12} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Chiều cao (cm)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập chiều cao" {...field} type="number" min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Cân nặng (kg)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập cân nặng" {...field} type="number" min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="force"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Lực bóp tay thuận (kg)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập lực bóp tay thuận" {...field} type="number" min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jump"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Bật xa tại chỗ (cm)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập bật xa tại chỗ" {...field} type="number" min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            {result && <div className="text-center font-bold text-xl">Kết quả: {result}!</div>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default App;
