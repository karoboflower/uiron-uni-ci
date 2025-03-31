import prompts from 'prompts';
import choices from './choices';
import projectName from './name';
import { onCancel } from './onCancel';
export async function question() {
  const questions = [...projectName()];

  const answers = await prompts(questions, { onCancel });
  const allList = await prompts(choices(), { onCancel });
  return { ...answers, ...allList };
}
