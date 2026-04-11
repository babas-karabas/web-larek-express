import { Error } from 'mongoose';

const normalizeErrorMessages = (errors: Error.ValidationError) => Object.values(errors.errors).map((error) => error.message).join(', ');

export default normalizeErrorMessages;
