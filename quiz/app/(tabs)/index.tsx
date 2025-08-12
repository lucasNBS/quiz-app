import { ApiQuestion } from "@/@types/quiz";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { CATEGORIES, DIFFICULTIES } from "@/constants";
import { useQuiz } from "@/hooks/useQuiz";
import { api } from "@/lib/api";
import { DefaultTheme } from "@/style/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const QuizFormSchema = z.object({
  amount: z.coerce
    .number({ error: "A quantidade deve ser um valor numérico" })
    .int({ error: "A quantidade de ser um número inteiro" })
    .min(3, "A quantidade mínima de questões é 3")
    .max(20, "A quantidade mínima de questões é 20"),
  category: z.object({
    text: z.string().nonempty("Selecione uma opção"),
    value: z.int(),
  }),
  difficulty: z.object({
    text: z.string().nonempty("Selecione uma opção"),
    value: z.string(),
  }),
});

type QuizFormSchemaType = z.infer<typeof QuizFormSchema>;

export default function Home() {
  const { setQuiz, setData, setAlreadyCreated } = useQuiz();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuizFormSchemaType>({
    resolver: zodResolver(QuizFormSchema) as any,
    defaultValues: {
      amount: undefined,
      category: { text: "", value: 0 },
      difficulty: { text: "", value: "" },
    },
  });

  async function onSubmit(data: QuizFormSchemaType) {
    try {
      const urlParams = `?amount=${data.amount}&category=${data.category.value}&difficulty=${data.difficulty.value}&type=multiple`;
      const res = await api.get(`https://opentdb.com/api.php${urlParams}`);
      const quiz = res.data.results.map((question: ApiQuestion) => {
        const options = question.incorrect_answers;

        // Insert correct answer in any order
        options.splice(
          Math.floor(Math.random() * (options.length + 1)),
          0,
          question.correct_answer
        );

        return {
          difficulty: question.difficulty,
          category: question.category,
          question: question.question,
          correct_answer: question.correct_answer,
          answers: options,
        };
      });
      setQuiz(quiz);
      setData(new Array(quiz.length).fill(""));
      setAlreadyCreated(false);
      router.push("/question");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.content}>
        <Text style={styles.title}>Quiz Maker</Text>
        <View style={styles.form}>
          <Controller
            control={control}
            rules={{
              required: "Preencha o campo",
            }}
            name="amount"
            render={() => {
              return (
                <FormField
                  label="Quantidade de Questões"
                  error={errors.amount?.message}
                  field={
                    <Input
                      name="amount"
                      setValue={setValue}
                      control={control}
                      keyboardType="numeric"
                      placeholder="Define o número de questões"
                    />
                  }
                />
              );
            }}
          />
          <Controller
            control={control}
            name="category"
            render={() => {
              return (
                <FormField
                  label="Categoria"
                  error={errors.category?.text?.message}
                  field={
                    <Select
                      name="category"
                      setValue={setValue}
                      control={control}
                      options={CATEGORIES}
                    />
                  }
                />
              );
            }}
          />
          <Controller
            control={control}
            name="difficulty"
            render={() => {
              return (
                <FormField
                  label="Dificuldade"
                  error={errors.difficulty?.text?.message}
                  field={
                    <Select
                      name="difficulty"
                      setValue={setValue}
                      control={control}
                      options={DIFFICULTIES}
                    />
                  }
                />
              );
            }}
          />
          <Pressable style={styles.create} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.createText}>Começar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: DefaultTheme.DARK_900,
    flex: 1,
  },
  content: {
    marginVertical: "auto",
  },
  title: {
    marginHorizontal: "auto",
    marginVertical: 32,
    fontSize: 32,
    color: DefaultTheme.LIGHT_100,
    fontWeight: "bold",
  },
  form: {
    position: "static",
    marginHorizontal: "auto",
    width: "90%",
    gap: 16,
  },
  create: {
    backgroundColor: DefaultTheme.PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  createText: {
    margin: "auto",
    color: DefaultTheme.LIGHT_100,
    fontWeight: "bold",
  },
});
