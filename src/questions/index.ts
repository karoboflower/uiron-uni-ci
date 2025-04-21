import prompts from 'prompts';
import { baseChoices, majorChoices, projectChoices } from './choices';
import projectName from './name';
import templateType from './template';
import { onCancel } from './onCancel';
export async function question() {
  const questions = [...projectName(), ...templateType()];

  const answers = await prompts(questions, { onCancel });
  const allList = await prompts(baseChoices(), { onCancel });
  return { ...answers, ...allList };
}
export async function majorQuestion() {
  const questions = await prompts(majorChoices(), { onCancel });
  return questions;
}
export async function projectQuestion() {
  const questions = await prompts(projectChoices(), { onCancel });
  return questions;
}
export async function templateTypeQuestion(type: string | undefined) {
  if (type === 'major') {
    return await prompts(majorChoices(), { onCancel });
  } else if (type === 'project') {
    return await prompts(projectChoices(), { onCancel });
  }
  return [];
}
