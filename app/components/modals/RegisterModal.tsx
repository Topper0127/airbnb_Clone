'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

import { signIn } from 'next-auth/react';
import Avatar from '../Avatar';
import { MdAddAPhoto } from 'react-icons/md'
import ImageUpload from '../Inputs/ImageUpload';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            image: '',
        }
    })

    const image = watch('image');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('New user created !');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error('Something Went Wrong');
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account"
            />
            <div className="flex justify-center">
                <div className='relative'>
                    <Avatar src={image || undefined} height={100} width={100} />
                    <MdAddAPhoto color="grey" size={25} className="absolute top-[70%] left-[75%] cursor-pointer" />
                    <div className="absolute top-0 left-0 w-10 opacity-0 h-2">
                        <ImageUpload
                            value={image}
                            onChange={(value) => setCustomValue('image', value)}
                        />
                    </div>
                </div>
            </div>
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className='
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                '
            >
                <div
                    className='flex flex-row items-center justify-center gap-2'
                >
                    <div>
                        Already have an account
                    </div>
                    <div
                        onClick={toggle}
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover-underline
                        '
                    >
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;