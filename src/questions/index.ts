import prompts from 'prompts';
import { baseChoices, majorChoices, projectChoices } from './choices';
import projectName from './name';
import templateType from './template';
import { onCancel } from './onCancel';
import { TemplateTypeEnum } from '../const/enum';
export async function question() {
  const questions = [...projectName(), ...templateType()];
  const answers = await prompts(questions, { onCancel });
  return answers;
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
  if (type === TemplateTypeEnum.major) {
    return await prompts(majorChoices(), { onCancel });
  } else if (type === TemplateTypeEnum.project) {
    return await prompts([...majorChoices(), ...projectChoices()], { onCancel });
  } else if (type === TemplateTypeEnum.base) {
    return await prompts(baseChoices(), { onCancel });
  }
  return [];
}
