'use client'
import React, { useState } from 'react'
import { Divider, Row, Col, Avatar, Input, Alert, Button, Upload } from 'antd'
import _ from 'lodash'
import { useForm, Controller } from 'react-hook-form'

import styles from './form.module.css'

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { handleTelInput, handleBrithInput } from '@/lib/functions'

type FormValues = {
    userName: string
    userTel: string
}

const UserForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, isDirty, errors },
        setValue,
    } = useForm({
        defaultValues: {
            userName: '홍길동',
            userBirth: '',
            userTel: '010-1234-5678',
        },
    })

    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `https://picsum.photos/${300}`,
        },
    ])

    // Tel 관련
    const handleTelChange = (tel: string) => {
        const afterTel = handleTelInput(tel)
        if (afterTel === false) {
            return false
        }
        setValue('userTel', afterTel)
    }

    // Birth 관련
    const handleBirthChange = (birth: string) => {
        const afterBirth = handleBrithInput(birth, 6)
        if (afterBirth === false) {
            return false
        }
        setValue('userBirth', afterBirth)
    }

    const onFileChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj as RcFile)
                reader.onload = () => resolve(reader.result as string)
            })
        }
        const image = new Image()
        image.src = src
        const imgWindow = window.open(src)
        imgWindow?.document.write(image.outerHTML)
    }

    return (
        <>
            <section className={styles.wrap}>
                <h1>Profile Detail</h1>
                <Divider />

                <Row gutter={[0, 36]} align={'middle'}>
                    <Col span={8} flex={2}>
                        사진
                    </Col>
                    <Col span={16}>
                        <Upload
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType={'picture-card'}
                            fileList={fileList}
                            onChange={onFileChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 2 && '+ Upload'}
                        </Upload>
                    </Col>

                    <Col span={8}>이름</Col>
                    <Col span={16}>
                        <Controller name={'userName'} control={control} render={({ field }) => <Input {...field} maxLength={15} placeholder={'이름...'} />} />
                    </Col>

                    <Col span={8}>생년월일</Col>
                    <Col span={16}>
                        <Controller
                            name={'userBirth'}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder={'생년월일'} onChange={(e) => handleBirthChange(e.target.value)} />}
                        />
                    </Col>

                    <Col span={8}>연락처</Col>
                    <Col span={16}>
                        <Controller
                            name={'userTel'}
                            control={control}
                            render={({ field }) => <Input placeholder={'연락처..'} {...field} onChange={(e) => handleTelChange(e.target.value)} />}
                        />
                    </Col>

                    <Col span={8}>주소</Col>
                    <Col span={16}>
                        <Input />
                    </Col>
                </Row>
            </section>
            <section className={styles.wrap}>
                <h1>정보 삭제</h1>
                <Divider />

                <Alert message="Warning" description="삭제하게 되면 모든 정보가 복구되지 않습니다." type="warning" showIcon />
                <Divider />
                <Row>
                    <Col push={23}>
                        <Button type={'primary'} danger>
                            삭제
                        </Button>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default UserForm
