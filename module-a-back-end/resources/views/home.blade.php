<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin Panel</title>
    <style>
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            background: transparent;
            color: white;
            border: none;
            font-size: 18px;
            outline: none
        }
        body {
            background-color: #0a0a0a;
            color: white;
            font-size: 18px;
            font-family: monospace;
            overflow-x: hidden;
        }
        form {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            padding: 4%;
            border: 1px solid  rgb(254,254,254,.4);
            border-radius: 10px;
            max-width: 400px;
            gap: 14px
        }
        h2 {
            font-size: 22px;
            width: 100%;
            border-bottom: 1px solid rgb(255,255,255, .4);
            margin: 10px 0;
        }
        input {
            padding: 6px 8px;
            margin-bottom: 4px;
            border-bottom: 1px solid rgb(255,255,255, .4);
            transition: all .3s linear;
        }
        input:focus {
            border-bottom-color: red
        }
        button {
            border: 1px solid rgb(255,255,255, .4);
            color: rgb(254,254,254,.4);
            padding: 6px 10px;
            border-radius: 10px;
            font-size: 20px;
            transition: all .3s linear;
        }
        button:hover {
            border-color: red;
            color: red;
            cursor: pointer;
        }
        .page {
            width: 100%;
            display: flex;
            padding: 2vh 4vw;
            gap: 2vw;
        }
        .page__left {
            width: 50%;
        }
        .page__right {
            width: 50%;
        }
        .admin {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            row-gap: 6px;
            border-bottom: 1px solid rgb(254,254,254,.2);
            padding: 4px 4px;
            margin-bottom: 4px;
            width: 100%;
        }
        .selected {
            background-color: rgb(255, 0, 0, .7)
        }
        .page__title {
            width: 100%;
            display: flex;
            padding: 2vh 4vw;
            gap: 2vw;
        }
        .btn {
            border: 1px solid rgb(255,255,255, .4);
            color: rgb(254,254,254,.4);
            padding: 6px 10px;
            border-radius: 10px;
            font-size: 20px;
            transition: all .3s linear;
            text-decoration: none;
        }
        .btn:hover {
            border-color: red;
            color: red;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="page__title">
        @auth
            Hi, 
        @endauth
    </div>
    <div class="page">
        <div class="page__left">
            <h2>Games</h2>
            <div class="admin selected">
                title - description - thumbnail - links - delete
            </div>
            @foreach ($games as $game)
                <div class="admin">
                    {{ $game['title'] }} -
                    {{ $game->description }} - 
                    thumbnail - 
                    links - 
                    <a href="/games/{slug}/delete" class="btn">del</a>
                </div>
            @endforeach
        </div>
        <div class="page__right">
            <h2>Admins</h2>
            <div class="admin selected">
                username - created - last login
            </div>
            @foreach ($admins as $admin)
                <div class="admin">
                    {{ $admin['username'] }} -
                    {{ $admin->created_at }} - 
                    {{ $admin->updated_at }}
                </div>
            @endforeach
            <h2>Users</h2>
            <div class="admin selected">
                username - created - last login - profile
            </div>
            @foreach ($users as $user)
                <div class="admin">
                    {{ $user['username'] }} -
                    {{ $user->created_at }} - 
                    {{ $user->updated_at }} -
                    <a href="/api/v1/users/{{ $user->username }}" >profile</a>
                </div>
            @endforeach
        </div>
    </div>
</body>
</html>