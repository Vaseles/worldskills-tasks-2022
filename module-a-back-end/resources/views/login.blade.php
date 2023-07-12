<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>

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
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            padding: 5%
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
            font-size: 28px
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
        p {
            background-color: rgb(237, 31, 31);
            color: #0a0a0a;
            padding: 4px 10px;
            border-radius: 10px
        }
    </style>
</head>
<body>
    <div class="">
        <form action="/XX-module-a/admin/login" method="POST">
            @csrf
            <h2>Login</h2>
            <input 
                type="text" 
                name="username"
                placeholder="Enter your username"
                required
            />
            <input 
                type="password" 
                name="password"
                placeholder="Enter your password"
                required
            />
            @if ($message != '')
                <p>{{ $message }}</p>
            @endif
            <button>Continue</button>
        </form>
    </div>
</body>
</html>