import React from 'react';
import {message, Input,Image, Typography, Descriptions,Button } from 'antd';
import { createGlobalStyle } from 'styled-components';
import {useStateful} from 'react-hanger'

import { ParentDiv } from '../components/ParentDiv';
import { UsernameDiv } from './../components/UsernameDiv';
import { InstagramSearch } from '../controllers/InstagramSearch'
import { SaveData } from '../controllers/SaveData'
import {User} from '../interfaces/UserModel'
import 'typeface-poppins';
import Logo from '../images/INSTOOL.png'
import Icon from '../images/cubo.svg'

const App = () => {
  const instagramData = useStateful<User | undefined>(undefined)
  const username = useStateful('')

  const onSave = React.useCallback(async () => {
    if(!instagramData.value) return
    message.loading({content: 'Salvando usuário...',key:'saving'})
    await SaveData(instagramData.value)
    message.destroy('saving')
    message.success({content: 'Usuário salvo com sucesso!'})
  },[instagramData])

  const onUsernameChange = React.useCallback(({target:{value}}) => { //observa
    username.setValue(value)
  }, [username])

  const canSearch = React.useCallback( () => {
    return username.value.length > 0
  },[username])

  const onSearch = React.useCallback(async () => { 
    if(!canSearch()) return
    instagramData.setValue(undefined)
    message.loading({content: 'Buscando conta...',key:'loadingInstagram'})
    const result = await InstagramSearch(username.value)
    message.destroy('loadingInstagram')
    if(result.error === 'USER_NOT_FOUND'){
      message.error({content:'Usuário não encontrado!'})
      return
    }
    instagramData.setValue(result)
  }, [username,canSearch,instagramData])

  return (
    <React.Fragment>
      <ParentDiv>
        <img src={Logo} className='instool'/>
        <UsernameDiv>
          <Typography.Text>
            Entre com o nome de usuário do Instagram para obter informações...
          </Typography.Text>
          <Input.Search
            className='username'
            enterButton={<Button disabled={!canSearch()} type='primary' >Buscar</Button>}
            addonBefore={'https://instagram.com/@'}
            placeholder='seu_usuario'
            onSearch={onSearch}
            value={username.value}
            onChange={onUsernameChange}
          />
        </UsernameDiv>
        {!!instagramData.value && (
          <React.Fragment>
            <img className='avatar' src={instagramData.value.profile_pic_url}/>
            <Descriptions className='detalhes' bordered>
              <Descriptions.Item label='Nome do usuário:'>{instagramData.value.username}</Descriptions.Item>
              <Descriptions.Item label='Nome completo:'>{instagramData.value.full_name}</Descriptions.Item>
              <Descriptions.Item label='Biografia:'>{instagramData.value.biography || '[ vazio ]'}</Descriptions.Item>
              <Descriptions.Item label='URL externa:'>{instagramData.value.external_url}</Descriptions.Item>
              <Descriptions.Item label='Conta recente:'>{instagramData.value.is_joined_recently ? 'Sim' : 'Não'}</Descriptions.Item>
              <Descriptions.Item label='É privado:'>{instagramData.value.is_private ? 'Sim' : 'Não'}</Descriptions.Item>
              <Descriptions.Item label='É um canal:'>{instagramData.value.has_channel ? 'Sim' : 'Não'}</Descriptions.Item>
              <Descriptions.Item label='É uma conta de negócio:'>{instagramData.value.is_business_account ? 'Sim' : 'Não'}</Descriptions.Item>
              <Descriptions.Item label='Categoria de negócio:'>{instagramData.value.business_category_name || 'Não é um negócio'}</Descriptions.Item>
              <Descriptions.Item label='Seguindo:'>{instagramData.value.follow}</Descriptions.Item>
              <Descriptions.Item label='Seguidores:'>{instagramData.value.followed_by}</Descriptions.Item>
              <Descriptions.Item label='Quantidade de posts:'>{instagramData.value.timeline_media_count}</Descriptions.Item>
            </Descriptions>
            <Button onClick={onSave} type='primary' className='btnSave'>Salvar este usuário</Button>
          </React.Fragment>
        )}
      </ParentDiv>
    </React.Fragment>
  );
}

export default App;
