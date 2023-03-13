'use client'
import React, { useState } from 'react'
import { Input, Button, Dropdown, Select } from 'antd'
import { FilterOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

import styles from './searchBox.module.css'

type FiletrOption = {
    value: string
    label: string
}

type FilterBoxProps = {
    selectOptions: FiletrOption[]
    closeFilterBoxAction: () => void
}

type SearchBoxProps = FilterBoxProps & {
    addBtnUrl: string
}

const FileterBox = ({ selectOptions, closeFilterBoxAction }: FilterBoxProps) => {
    return (
        <div className={styles.filterWrap}>
            <label>조건:</label>
            <Select
                showSearch
                placeholder={'조건 선택'}
                options={selectOptions}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
            <div className={styles.btnWrap}>
                <Button
                    onClick={() => {
                        closeFilterBoxAction()
                    }}
                >
                    취소
                </Button>
                <Button
                    type={'primary'}
                    onClick={() => {
                        closeFilterBoxAction()
                    }}
                >
                    확인
                </Button>
            </div>
        </div>
    )
}

const SearchBox = ({ selectOptions, addBtnUrl }: Partial<SearchBoxProps>) => {
    const [filterBoxOpen, setFilterBoxOpen] = useState<boolean>(false)

    const router = useRouter()

    const closeFilterBoxAction = () => {
        setFilterBoxOpen(false)
    }

    return (
        <div className={styles.wrap}>
            <Input className={styles.input} prefix={<SearchOutlined />} size={'large'} placeholder={'검색어를 입력하세요'} />
            <div className={styles.btnWrap}>
                <Dropdown
                    open={filterBoxOpen}
                    dropdownRender={(menu) => {
                        return (
                            <FileterBox
                                closeFilterBoxAction={closeFilterBoxAction}
                                selectOptions={[
                                    {
                                        value: 'name',
                                        label: '이름',
                                    },
                                    {
                                        value: 'title',
                                        label: '제목',
                                    },
                                    {
                                        value: 'content',
                                        label: '설명',
                                    },
                                ]}
                            />
                        )
                    }}
                    placement="bottom"
                    trigger={['click']}
                    onOpenChange={(open) => {
                        setFilterBoxOpen(open)
                    }}
                >
                    <Button type={'dashed'} icon={<FilterOutlined />}>
                        필터링
                    </Button>
                </Dropdown>

                {addBtnUrl && (
                    <Button
                        type={'primary'}
                        onClick={() => {
                            router.push(addBtnUrl)
                        }}
                        icon={<UserAddOutlined />}
                    >
                        추가
                    </Button>
                )}
            </div>
        </div>
    )
}

export default SearchBox
